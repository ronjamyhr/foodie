import {
  faGlassMartiniAlt,
  faConciergeBell,
  faBreadSlice,
  faMugHot,
  faHamburger,
  faCookieBite,
} from '@fortawesome/free-solid-svg-icons'

export const filterDefinitions = [
  {
    id: 1,
    type: 'drinks',
    className: 'filter-drinks-wrapper',
    icon: faGlassMartiniAlt,
  },
  {
    id: 2,
    type: 'dinner',
    className: 'filter-dinner-wrapper',
    icon: faConciergeBell,
  },
  {
    id: 3,
    type: 'breakfast',
    className: 'filter-breakfast-wrapper',
    icon: faBreadSlice,
  },
  {
    id: 4,
    type: 'fika',
    className: 'filter-fika-wrapper',
    icon: faMugHot,
  },
  {
    id: 5,
    type: 'lunch',
    className: 'filter-lunch-wrapper',
    icon: faHamburger,
  },
  {
    id: 6,
    type: 'snack',
    className: 'filter-snack-wrapper',
    icon: faCookieBite,
  },
]
