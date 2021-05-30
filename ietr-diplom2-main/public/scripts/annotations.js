let annotations = {}
var timer

function setAnnotationPosition(id) {
  let p2 = getCenterOfNodeId(annotations[id].nodeid);
  if (!viewer.impl.camera.position.equals(p2)) {
      clientPos = viewer.impl.worldToClient(p2, viewer.impl.camera);
      p2.x = clientPos.x;
      p2.y = clientPos.y;
      document.querySelector('#annotation-' + id).style.left = p2.x + "px";
      document.querySelector('#annotation-' + id).style.top = p2.y + "px";
  }
}

function addAnnotation(id, nodeid, start, end, annotationText) {
  annotations[id] = {
    nodeid: nodeid,
    start: start,
    end: end,
    text: annotationText,
  }

  showAnnotation(id)
  setAnnotationPosition(id)
}

function showAnnotation(id) {
  if (!document.querySelector('#annotation-' + id)) {
    const annotation = document.createElement('div')
    annotation.id = 'annotation-' + id
    annotation.classList.add('annotation')
    document.querySelector('#viewer').appendChild(annotation)
    const annotationText = document.createElement('p')
    annotationText.innerText = annotations[id].annotationText //////////!!!!!
    annotationText.style.fontSize = '15px'
    annotation.appendChild(annotationText)
    setAnnotationPosition(id)
  }
  
}
function annotationUpdate() {
  for (const id in annotations) {
      let p2 = getCenterOfNodeId(annotations[id].nodeid);
      if (!viewer.impl.camera.position.equals(p2)) {
          clientPos = viewer.impl.worldToClient(p2, viewer.impl.camera);
          p2.x = clientPos.x;
          p2.y = clientPos.y;
          if (document.querySelector('#annotation-' + id)) {
              document.querySelector('#annotation-' + id).style.left = p2.x + "px";
              document.querySelector('#annotation-' + id).style.top = p2.y + "px";
          }
      }
  }
}

function getCenterOfNodeId(nodeId) {
  if (!viewer) {
      console.error(`Viewer is not initialized`);
      return;
  }

  let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);
  if (fragId == -1) {
      console.error(`nodeId ${nodeId} not found`);
      return;
  }

  let fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, fragId);
  fragProxy.getAnimTransform();

  let worldMatrix = new THREE.Matrix4();
  fragProxy.getWorldMatrix(worldMatrix);

  return worldMatrix.getPosition().clone();
}

function hideAnnotation(id) {
  if (document.querySelector('#annotation-' + id)) $('#annotation-' + id).remove();
}

// function onMouseMove() {
// if (isAnimationStarted) {
//   let animExt = viewer.getExtension('Autodesk.Fusion360.Animation')
//   if (!animExt.isPlaying()) annotationUpdate()
// }
// }

let interval = setInterval(animTimer, 100);
function animTimer() {
  if (isAnimationStarted) {
      let animExt = viewer.getExtension("Autodesk.Fusion360.Animation");

      let progress = Math.floor(animExt.getCurrentTime() / animExt.getDuration() * 100); 

      annotations.forEach(element => {
          let start = annotations[annotations.indexOf(element)].start; 
          let end = annotations[annotations.indexOf(element)].end; 
          if ((progress >= start) && (progress < end)) {
              showAnnotation(annotations.indexOf(element));
              viewer.select(element.nodeid);
          }
          if ((progress < start) || (progress >= end)) hideAnnotation(annotations.indexOf(element));
      });

      if (animExt.isPlaying()) {
          annotationUpdate();
      }
  }
}
function deleteAllAnnotations() {
  for (const id in annotations) {
      delete annotations[id];
      document.querySelector("#annotation-" + id).remove();
  }
}
