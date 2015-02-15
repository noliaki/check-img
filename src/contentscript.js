// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.browserAction.onClicked.addListener(updateIcon);


function updateIcon(e) {
  chrome.tabs.insertCSS(null, {file:"css/img.css"});
  chrome.tabs.executeScript(null, {file:"js/content.js"});
}