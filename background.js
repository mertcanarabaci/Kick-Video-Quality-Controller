// Set default settings on first install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['enabled', 'quality'], (data) => {
    if (data.enabled === undefined) {
      chrome.storage.local.set({ 
        enabled: true,
        quality: '1080'
      });
    }
  });
  
  console.log('Kick Video Quality Controller installed!');
});
