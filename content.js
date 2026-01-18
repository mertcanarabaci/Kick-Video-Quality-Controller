(function() {
    'use strict';
    
    // Check settings and apply
    chrome.storage.local.get(['enabled', 'quality'], function(data) {
        const enabled = data.enabled !== undefined ? data.enabled : true;
        const quality = data.quality || '1080';
        
        if (!enabled) {
            console.log('[Kick Quality Controller] Disabled');
            return;
        }
        
        console.log(`[Kick Quality Controller] ${quality}p quality active`);
        
        // Initial setup
        setQuality(quality);
        
        // Watch DOM changes with MutationObserver
        const observer = new MutationObserver(() => {
            const currentQuality = sessionStorage.getItem('stream_quality');
            if (currentQuality !== quality) {
                console.log(`[Kick Quality Controller] Quality changed (${currentQuality} -> ${quality}), fixing...`);
                setQuality(quality);
            }
        });
        
        // Start observer
        if (document.documentElement) {
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }
        
        // Also check when page fully loads
        window.addEventListener('load', () => {
            setQuality(quality);
        });
        
        // Add same protection for localStorage (some sites use localStorage)
        setInterval(() => {
            const sessionQuality = sessionStorage.getItem('stream_quality');
            const localQuality = localStorage.getItem('stream_quality');
            
            if (sessionQuality !== quality) {
                setQuality(quality);
            }
            if (localQuality !== quality) {
                localStorage.setItem('stream_quality', quality);
            }
        }, 500);
    });
    
    function setQuality(quality) {
        // Write to sessionStorage
        sessionStorage.setItem('stream_quality', quality);
        
        // Also write to localStorage (some sites use localStorage)
        localStorage.setItem('stream_quality', quality);
        
        // Check other common keys
        const commonKeys = [
            'video_quality',
            'videoQuality',
            'quality',
            'playback_quality',
            'player_quality',
            'resolution'
        ];
        
        commonKeys.forEach(key => {
            sessionStorage.setItem(key, quality);
            localStorage.setItem(key, quality);
        });
    }
    
})();
