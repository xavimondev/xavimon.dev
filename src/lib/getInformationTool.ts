const path = process.env.NODE_ENV === 'production' ? '/assets/svg' : '/public/assets/svg';

type Information = {
  url: string;
  urlSvg: string;
}

function getInformationTool(tool: string){
  let information: Information = {
    url: '',
    urlSvg: ''
  }

  switch(tool){
    case 'HTML':
      information = {
        url: 'https://htmlreference.io/',
        urlSvg: `${path}/html.svg`,
      }
      break;
    case 'CSS':
      information = {
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        urlSvg: `${path}/css.svg`
      }
      break;
    case 'JavaScript':
      information = {
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        urlSvg: `${path}/javascript.svg`
      }
      break;
    case 'Astro':
      information = {
        url: 'https://docs.astro.build/',
        urlSvg: `${path}/astro.svg`
      }
      break;
    case 'Firebase':
      information = {
        url: 'https://firebase.google.com/',
        urlSvg: `${path}/firebase.svg`
      }
      break;
    case 'MongoDB':
      information = {
        url: 'https://www.mongodb.com/atlas/database',
        urlSvg: `${path}/mongodb.svg`
      }
      break;
    case 'MySQL':
      information = {
        url: 'https://www.mongodb.com/atlas/database',
        urlSvg: `${path}/mysql.svg`
      }
      break;
    case 'Node':
      information = {
        url: 'https://nodejs.org/en/',
        urlSvg: `${path}/nodejs.svg`
      }
      break;
    case 'React':
      information = {
        url: 'https://reactjs.org/',
        urlSvg: `${path}/react.svg`
      }
      break;
    case 'Tailwind':
      information = {
        url: 'https://tailwindcss.com/',
        urlSvg: `${path}/tailwindcss.svg`
      }
      break;
    case 'Vite':
      information = {
        url: 'https://vitejs.dev/',
        urlSvg: `${path}/vitejs.svg`
      }
      break;
    case 'Typescript':
      information = {
        url: 'https://www.typescriptlang.org/',
        urlSvg: `${path}/typescript.svg`
      }
      break;
  }
  return information;
}

export default getInformationTool;
