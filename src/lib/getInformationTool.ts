import JavascriptIcon from 'public/assets/svg/javascript.svg';
import CSSIcon from 'public/assets/svg/css.svg';
import AstroIcon from 'public/assets/svg/astro.svg';
import HTMLIcon from 'public/assets/svg/html.svg';
import FirebaseIcon from 'public/assets/svg/firebase.svg';
import MongoDBIcon from 'public/assets/svg/mongodb.svg';
import MySQLIcon from 'public/assets/svg/mysql.svg';
import NodeIcon from 'public/assets/svg/nodejs.svg';
import ReactIcon from 'public/assets/svg/react.svg';
import TailwindIcon from 'public/assets/svg/tailwindcss.svg';
import ViteIcon from 'public/assets/svg/vitejs.svg';
import TypescriptIcon from 'public/assets/svg/typescript.svg';

type Information = {
  url: string;
  icon: any
}

function getInformationTool(tool: string){
  let information: Information = {
    url: '',
    icon: null
  }

  switch(tool){
    case 'HTML':
      information = {
        url: 'https://htmlreference.io/',
        icon: HTMLIcon,
      }
      break;
    case 'CSS':
      information = {
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        icon: CSSIcon
      }
      break;
    case 'JavaScript':
      information = {
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        icon: JavascriptIcon
      }
      break;
    case 'Astro':
      information = {
        url: 'https://docs.astro.build/',
        icon: AstroIcon
      }
      break;
    case 'Firebase':
      information = {
        url: 'https://firebase.google.com/',
        icon: FirebaseIcon
      }
      break;
    case 'MongoDB':
      information = {
        url: 'https://www.mongodb.com/atlas/database',
        icon: MongoDBIcon
      }
      break;
    case 'MySQL':
      information = {
        url: 'https://www.mongodb.com/atlas/database',
        icon: MySQLIcon
      }
      break;
    case 'Node':
      information = {
        url: 'https://nodejs.org/en/',
        icon: NodeIcon
      }
      break;
    case 'React':
      information = {
        url: 'https://reactjs.org/',
        icon: ReactIcon
      }
      break;
    case 'Tailwind':
      information = {
        url: 'https://tailwindcss.com/',
        icon: TailwindIcon
      }
      break;
    case 'Vite':
      information = {
        url: 'https://vitejs.dev/',
        icon: ViteIcon
      }
      break;
    case 'Typescript':
      information = {
        url: 'https://www.typescriptlang.org/',
        icon: TypescriptIcon
      }
      break;
  }
  return information;
}

export default getInformationTool;
