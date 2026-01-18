// Ayarları yükle
chrome.storage.local.get(['enabled', 'quality'], function(data) {
  const enabled = data.enabled !== undefined ? data.enabled : true;
  const quality = data.quality || '1080';
  
  document.getElementById('enableToggle').checked = enabled;
  document.getElementById('qualitySelect').value = quality;
  
  updateStatus(enabled, quality);
});

// Toggle değişikliğini dinle
document.getElementById('enableToggle').addEventListener('change', function(e) {
  const enabled = e.target.checked;
  chrome.storage.local.set({ enabled: enabled });
  
  const quality = document.getElementById('qualitySelect').value;
  updateStatus(enabled, quality);
});

// Kalite seçimi değişikliğini dinle
document.getElementById('qualitySelect').addEventListener('change', function(e) {
  const quality = e.target.value;
  chrome.storage.local.set({ quality: quality });
  
  const enabled = document.getElementById('enableToggle').checked;
  updateStatus(enabled, quality);
});

// Uygula butonu
document.getElementById('applyBtn').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
    window.close();
  });
});

// Update status display
function updateStatus(enabled, quality) {
  const statusDiv = document.getElementById('status');
  const statusText = document.getElementById('statusText');
  
  if (enabled) {
    statusDiv.className = 'status active';
    statusText.textContent = `Active - Fixed at ${quality === 'auto' ? 'Auto' : quality + 'p'} quality`;
  } else {
    statusDiv.className = 'status inactive';
    statusText.textContent = 'Disabled';
  }
}
