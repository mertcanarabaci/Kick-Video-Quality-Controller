// Set default settings on first install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['enabled', 'quality'], (data) => {
    if (data.enabled === undefined) {
      chrome.storage.sync.set({ 
        enabled: true,
        quality: '1080'
      });
    }
  });
  
  console.log('Kick Video Quality Controller installed!');
});