let viewer,
  doc2,
  currentAnimId,
  isAnimationStarted = false,
  isModelLoaded = true,
  FORGE_MODEL_URN =
    
    // 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIxLTA1LTMwLTEyLTI3LTAxLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0NIRVJZJTIwU0NSMzcyJTIwRW5naW5lJTIwKEpvaG4lMjBEZWVyZSUyMEdhdG9yJTIwODI1aSklMjB2NjQuZjNk'
    'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIxLTA2LTA2LTA5LTU3LTQzLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0NIRVJZX1NRUjM3Ml9FbmdpbmVfSm9obl9EZWVyZV9HYXRvcl84MjVpX3Y2OCUyMHYyNC5mM2Q'
const options = {
  env: 'AutodeskProduction',
  api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
  getAccessToken: getForgeToken,
}

function getForgeToken(onTokenReady) {
  $.get('/oauth', (data) => {
    const token = data.access_token
    const timeInSeconds = data.expires_in // Use value provided by Forge Authentication (OAuth) API
    onTokenReady(token, timeInSeconds)
  })
}

Autodesk.Viewing.Initializer(options, function () {
  loadModel()
})

function loadModel() {
  $("#viewer").html(`<b></b>`);
  isModelLoaded = true
  const htmlDiv = document.getElementById('viewer')
  const config = {
    extensions: ['Autodesk.Fusion360.Animation', 'Autodesk.NPR'],
    externals: { EventsEmitter: 'EventsEmmitter' },
    disabledExtensions: {
      measure:false,
      viewcube:false,
      layermanage:false,
      explode:false,
      section:false,
      hyperlink:true,
      bimwalk:true,
      fusionOrbit:true,
      //...
      }
  }

  viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config)
  viewer.setProgressiveRendering(false)
  const startedCode = viewer.start()
  if (startedCode > 0) {
    console.error('Failed to create a Viewer: WebGL not supported.')
    return
  }

  console.log('Initialization complete, loading a model next...')
  viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => {
    // Функция, срабатывает после полной загрузки модели
    viewer.setLightPreset(8)
  })

  Autodesk.Viewing.Document.load(
    FORGE_MODEL_URN,
    onDocumentLoadSuccess,
    onDocumentLoadFailure
  )
}

function stopViewer() {
  viewer.finish()
  viewer = null
  document.getElementById('viewer').innerHTML = ''
}

function startViewer(success, fail) {
  Autodesk.Viewing.Initializer(options, function onInitialized() {
    // Загрузка документа CAD модели
    Autodesk.Viewing.Document.load(FORGE_MODEL_URN, success, fail)
  })
}

function loadAnimation(doc, id) {
  // Create Viewer instance
  // Create Viewer instance
  var viewerDiv = document.getElementById('viewer')
  var config = {
    extensions: ['Autodesk.Fusion360.Animation', 'Autodesk.NPR'],
    externals: { EventsEmitter: 'EventsEmitter' },
  }

  // Create the Viewer 3D instance with default UI
  viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv, config)

  let animationsFolder = doc
    .getRoot()
    .search({ type: 'folder', role: 'animation' })
  let animations = animationsFolder[0]

  let animationUrl = doc.getViewablePath(animations.children[id])

  viewer.start(animationUrl, {}, onLoadModelSuccess, onLoadModelError)
  currentAnimId = id
  showAnnotations(id)
}

function onLoadModelSuccess(model) {
  viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, (e) => {
    // Функция, срабатывает после полной загрузки модели
    // onTimerTick();
  })

  viewer.addEventListener(Autodesk.Viewing.ANIMATION_READY_EVENT, (e) => {
    animationExt = viewer.getExtension('Autodesk.Fusion360.Animation')
    isAnimationStarted = true
    animationExt.play()
    //checkSeconds();
  })
}

function onLoadModelError(viewerErrorCode) {
  console.error('onLoadModelError() - errorCode:' + viewerErrorCode)
}

function onDocumentLoadSuccess(doc) {
  const defaultModel = doc.getRoot().getDefaultGeometry()
  viewer.loadDocumentNode(doc, defaultModel)
  doc2 = doc

  // let animationsFolder = doc
  //   .getRoot()
  //   .search({ type: 'folder', role: 'animation' })
  // if (animationsFolder.length == 0) console.error('Модель не содержит анимаций')
  // else loadAnimation(doc, 0)
}

function onDocumentLoadFailure() {
  console.error('Failed fetching Forge manifest')
}

function onViewerClick() {
  if (document.getElementById('partDescr')) {
    let detail = viewer.getSelection()[0]
    if (detail) {
      console.log(detail)
      showPartDescription(detail)
    }
  }
}
