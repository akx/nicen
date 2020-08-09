import './carbon.css';

const ADTAG_ID = '_carbonads_js';

export function injectCarbonTag() {
  const scriptTag = document.createElement('script');
  scriptTag.id = ADTAG_ID;
  scriptTag.async = true;
  scriptTag.type = 'text/javascript';
  scriptTag.src = '//cdn.carbonads.com/carbon.js?serve=CEBDLK3Y&placement=nicenpw';
  document.body.appendChild(scriptTag);
}
