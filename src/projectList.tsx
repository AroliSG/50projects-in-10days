

import expandingcards from './50projects/expandingcards';
import progresssteps from './50projects/progresssteps';
import RotatingNavigation from './50projects/rotatingnavigation';
import HiddenSearch from './50projects/hiddensearch';
import BurryLoading from './50projects/burryloading';
import ScrollAnimation from './50projects/scrollanimation';
import SplitLanding from './50projects/splitlanding';
import FormWavy from './50projects/formwavy';
import SoundBoard from './50projects/soundboard';
import YoMamaJokes from './50projects/randomuser';
import EventKeycodes from './50projects/eventkeycodes';
import FaqCollapse from './50projects/faqcollapse';
import RandomChoicePicker from './50projects/randomchoisespicker';
import AnimatedNavigation from './50projects/animatednavigation';
import IncrementingCounter from './50projects/Incrementingcounter';
import DrinkWater from './50projects/drinkwater';
import MovieApp from './50projects/movieapp';
import backgroundSlider from './50projects/backgroundslider';
import ThemeClock from './50projects/themeclock';
import RippleEffect from './50projects/rippleeffect';
import DragDrop from './50projects/dragndrop';
import DrawingApp from './50projects/drawingapp';

const Projects: {
    name: string,
    Element: () => JSX.Element
}[] = [
    { name: 'Expanding Cards', Element: expandingcards },
    { name: 'Progress Steps', Element: progresssteps },
    { name: 'Rotating Navigation', Element: RotatingNavigation },
    { name: 'Hidden Search', Element: HiddenSearch },
    { name: 'Burry Loading', Element: BurryLoading },
    { name: 'Scroll Animation', Element: ScrollAnimation },
    { name: 'Split Landing', Element: SplitLanding },
    { name: 'Form Wavy', Element: FormWavy },
    { name: 'Sound Board', Element: SoundBoard },
    { name: 'Random User', Element: YoMamaJokes },
    { name: 'Event Keycodes', Element: EventKeycodes} ,
    { name: 'Faq Collapse', Element: FaqCollapse },
    { name: 'Random Choice Picker', Element: RandomChoicePicker },
    { name: 'Animated Navigation', Element: AnimatedNavigation },
    { name: 'Incrementing Counter', Element: IncrementingCounter },
    { name: 'Drink Water', Element: DrinkWater },
    { name: 'Movie App', Element: MovieApp },
    { name: 'Background Slider', Element: backgroundSlider },
    { name: 'Theme Clock', Element: ThemeClock },
    { name: 'Ripple Effect', Element: RippleEffect },
    { name: 'Drag N Drop', Element: DragDrop },
    { name: 'Drawing App', Element: DrawingApp },
]

export default Projects;