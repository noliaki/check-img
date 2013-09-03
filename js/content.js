;(function(window){
  var
  window = window,
  document = window.document,
  tabId,
  imgs,
  imgsLength = 0,

  $body = document.getElementsByTagName("body")[0],

  modalBgName ="wlbImgChecker-modalBg",
  $modalBg = document.getElementById( modalBgName ),

  containerName = "wlbImgChecker-imgContainer",
  $imgContainer = document.getElementById( containerName ),

  mousePoint = {
    x : 0,
    y : 0
  },
  
  $focus,
  focusIndex = 0;

  function init(){
    window.removeEventListener("resize", onWindowResize, false);
    window.addEventListener("resize", onWindowResize, false);
    
    if( $modalBg || $imgContainer ){
      $body.removeChild( $modalBg );
      $body.removeChild( $imgContainer );
      focusIndex = 0;
    }
    else {
      imgs = document.getElementsByTagName("img");
      imgsLength = imgs.length;
      setImgChecker();
    }
    // console.log( document.createDocumentFragment() );
  };

  function onWindowResize(){
    if( $modalBg || $imgContainer ){
      $body.removeChild( $modalBg );
      $body.removeChild( $imgContainer );
      focusIndex = 0;
    }
    imgs = document.getElementsByTagName("img");
    imgsLength = imgs.length;
    setImgChecker();
  };

  function setImgChecker(){
    $modalBg = document.createElement("div");
    $modalBg.setAttribute("id", modalBgName);

    $imgContainer = document.createElement("div");
    $imgContainer.setAttribute("id", containerName);

    $body.appendChild( $modalBg );
    $body.appendChild( $imgContainer );

    var
    fragment = document.createDocumentFragment(),
    i = -1;
    
    for( ; ++ i < imgsLength; ){
      fragment.appendChild( createChecker(i) );
    }
    $imgContainer.appendChild( fragment );
  };

  function onMouseDown(event){
    event.preventDefault();

    mousePoint.x = event.layerX;
    mousePoint.y = event.layerY;

    $focus = event.currentTarget;
    $focus.style.zIndex = (++focusIndex);

    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);

    return false;
  };

  function onMouseUp(event){
    event.preventDefault();
    document.removeEventListener("mousemove", onMouseMove, false);
    document.removeEventListener("mouseup", onMouseUp, false);

    return false;
  };

  function onMouseMove(event){
    event.preventDefault();
    $focus.style.left = event.pageX - mousePoint.x + "px";
    $focus.style.top = event.pageY - mousePoint.y + "px";

    return false;
  };

  function onMouseEnter(event){
    event.preventDefault();

    var
    hitArea = event.currentTarget.querySelector(".hitArea"),
    overlayImage = event.currentTarget.querySelector(".overlayImage"),
    imgDetail = event.currentTarget.querySelector(".img-detail");

    hitArea.style.width = overlayImage.offsetWidth + imgDetail.offsetWidth + 7 + "px";
    hitArea.style.height = (overlayImage.offsetHeight > imgDetail.offsetHeight? overlayImage.offsetHeight : imgDetail.offsetHeight) + "px";
  };

  function onMouseOut(event){
    event.preventDefault();

    var hitArea = event.currentTarget.querySelector(".hitArea");

    hitArea.style.width = "0px";
    hitArea.style.height = "0px";
  };

  function onCloseClick( div ){
    return function(event){
      event.preventDefault();
      div.parentNode.removeChild( div );
    }
  };

  function createChecker( index ){
    var fragment = document.createDocumentFragment();

    var div = document.createElement("div");
    div.className = "img-container";
    div.style.position = "absolute";
    div.style.top = imgs[index].y + "px";
    div.style.left = imgs[index].x + "px";

    var imgDetail = document.createElement("div");
    imgDetail.className = "img-detail";
    imgDetail.style.top = 0;
    imgDetail.style.left = imgs[index].width + 7 + "px";

    var closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.style.left = imgs[index].width + 130 + "px";
    closeBtn.innerHTML = "✕";

    var
      attrWidth = /\%$/.test(imgs[index].getAttribute("width"))? imgs[index].getAttribute("width") : parseInt(imgs[index].getAttribute("width"));
      attrHeight = /\%$/.test(imgs[index].getAttribute("height"))? imgs[index].getAttribute("height") : parseInt(imgs[index].getAttribute("height"));


    var txt =
      (attrWidth !== imgs[index].naturalWidth? '<p class="width-size defference">[width] : ' : '<p class="width-size">[width] : ') +
      attrWidth + '<br>(<strong>original:' + imgs[index].naturalWidth + '</strong>)</p>' +
      (attrHeight !== imgs[index].naturalHeight? '<p class="height-size defference">[height] : ' : '<p class="height-size">[height] : ') +
      attrHeight + '<br>(<strong>original:' + imgs[index].naturalHeight + '</strong>)</p>' +
      '<p class="alt">[alt]<br>' + imgs[index].alt + '</p>';

    if(attrWidth !== imgs[index].naturalWidth || attrHeight !== imgs[index].naturalHeight){
      div.className += " caution";
    }

    imgDetail.innerHTML = txt;

    var img = document.createElement("img");
    img.src = imgs[index].src;
    img.width = imgs[index].width;
    img.height = imgs[index].height;
    img.className = "overlayImage";

    var hitArea = document.createElement("div");
    hitArea.className = "hitArea";


    div.addEventListener("mousedown", onMouseDown, false);
    div.addEventListener("mouseup", onMouseUp, false);
    div.addEventListener("mouseover", onMouseEnter, false);
    div.addEventListener("mouseout", onMouseOut, false);

    closeBtn.addEventListener("click", onCloseClick(div), false);

    fragment.appendChild(img);
    fragment.appendChild(imgDetail);
    fragment.appendChild(hitArea);
    fragment.appendChild(closeBtn);

    div.appendChild( fragment );

    return div;
  };

  init();

})(window);