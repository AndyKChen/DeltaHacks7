import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetAppOutlined';
import ListView from '../Components/ListView';
import React from 'react';
import VideoFrame from '../Components/VideoFrame';
import useStyles from './Train-jss';

const Train = () => {
  let identity = 0;
  let classes = []; // list of classes
  const classesStyles = useStyles();

  const start = async () => {
    const trainingCards = document.getElementById('training-cards');
    const predictions = document.getElementById('predictions');
    const confidence = document.getElementById('confidence');

    const createKNNClassifier = async () => {
      console.log('Loading KNN Classifier');
      return await window.knnClassifier.create();
    };
    const createMobileNetModel = async () => {
      console.log('Loading Mobilenet Model');
      return await window.mobilenet.load();
    };
    const createWebcamInput = async () => {
      console.log('Loading Webcam Input');
      const webcamElement = await document.getElementById('webcam');
      return await window.tf.data.webcam(webcamElement);
    };

    const mobilenetModel = await createMobileNetModel();
    const knnClassifierModel = await createKNNClassifier();
    const webcamInput = await createWebcamInput();
    var preloader = document.getElementById('loading');

    function preLoader() {
      preloader.style.display = 'none';
    }
    preLoader();

    const addClass = () => {
      const inputClassName = document.getElementById('inputClassName');

      let Classname = inputClassName.value;
      const found = classes.some((el) => el.name === Classname);
      if (!found) {
        identity += 1;
        classes.push({ id: identity, name: Classname, count: 0 });
      }

      trainingCards.innerHTML +=
        '<div class="newshifter"><div class="text-center"><h3>Class Name : <span>' +
        Classname +
        '</span></h3><h3>Images : <span id = "images-' +
        identity +
        '" >0</span></h3></div ><div><button class="dark btn-spread btn-shadow mr-5" id="' +
        identity +
        '">Add New Images <i class="fas fa-plus fa-1x"></i></button></div></div>';

      document
        .getElementById(identity.toString())
        .addEventListener('click', () => addDatasetClass(identity));
      // trainingCards.innerHTML = '';
      inputClassName.value = '';
      console.log(classes);
    };

    const initializeElements = () => {
      const inputClassName = document.getElementById('inputClassName').value;
      document
        .getElementById('add-button')
        .addEventListener('click', () => addClass(inputClassName));
      // document.getElementById('btnSpeak').addEventListener('click', () => speak());
      // document.getElementById('load_button').addEventListener('change', (event) => uploadModel(knnClassifierModel, event));
      // document.getElementById('save_button').addEventListener('click', async () => downloadModel(knnClassifierModel));
    };

    const addDatasetClass = async (classId) => {
      // Capture an image from the web camera.
      const img = await webcamInput.capture();

      // Get the intermediate activation of MobileNet 'conv_preds' and pass that
      // to the KNN classifier.
      const activation = mobilenetModel.infer(img, 'conv_preds');

      // Pass the intermediate activation to the classifier.
      knnClassifierModel.addExample(activation, classId);

      let classIndex = classes.findIndex((el) => el.id === classId);
      let currentCount = classes[classIndex].count;
      currentCount += 1;
      classes[classIndex].count = currentCount;

      var temp_id = 'images-' + classId.toString();
      document.getElementById(temp_id).innerHTML = currentCount;

      // Dispose the tensor to release the memory.
      img.dispose();
    };

    const imageClassificationWithTransferLearningOnWebcam = async () => {
      console.log('Machine Learning on the web is ready');
      while (true) {
        if (knnClassifierModel.getNumClasses() > 0) {
          const img = await webcamInput.capture();

          // Get the activation from mobilenet from the webcam.
          const activation = mobilenetModel.infer(img, 'conv_preds');
          // Get the most likely class and confidences from the classifier module.
          const result = await knnClassifierModel.predictClass(activation);

          //console.log(classes[result.label - 1].name)
          try {
            predictions.innerHTML = classes[result.label - 1].name;
            confidence.innerHTML = Math.floor(result.confidences[result.label] * 100);
            document.getElementById('change-prediction').click();
          } catch (err) {
            predictions.innerHTML = result.label - 1;
            confidence.innerHTML = Math.floor(result.confidences[result.label] * 100);
          }

          // Dispose the tensor to release the memory.
          img.dispose();
        }
        await window.tf.nextFrame();
      }
    };

    await initializeElements();
    await imageClassificationWithTransferLearningOnWebcam();
  };

  window.onload = async () => {
    await start();
  };

  return (
    <>
      <div id="loading"></div>

      <div className={classesStyles.background}>
        <div className={classesStyles.videoContainer}>
          <div>
            <Button
              id="save_button"
              color="primary"
              variant="outlined"
              className={classesStyles.downloadBtn}
              startIcon={<GetAppIcon />}
            >
              Download Model
            </Button>
          </div>
          <div>
            <VideoFrame />
          </div>
        </div>
        <div className={classesStyles.chatContainer}>
          <ListView classList={classes} />
          <div id="training-cards"></div>
          <div className="column flex-2-container">
            <div>
              <div className="model">
                <input id="load_button" className="fileinputs" type="file" accept=".json"></input>
                <label htmlFor="upload-photo">Browse...</label>
              </div>
              <div className="add-class text-center">
                <input
                  id="inputClassName"
                  type="text"
                  placeholder="Enter Class Name Here"
                  name="option"
                />
                <button className="dark btn-lg btn-shadow mr-5" id="add-button">
                  Add
                  <i className="fas  fa-plus fa-1x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Train;
