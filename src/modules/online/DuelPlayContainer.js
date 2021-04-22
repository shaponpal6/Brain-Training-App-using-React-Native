import { compose, withState } from 'recompose';

import DuelPlayView from './DuelPlayView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  DuelPlayView,
);
