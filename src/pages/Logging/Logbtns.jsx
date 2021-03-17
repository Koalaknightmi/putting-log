import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
//import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
//import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {useSelector} from 'react-redux'
import {getaddnum} from '../../reducers/putts'

const SubmitBtn = ({made,onClicked}) => {
  const num = useSelector(getaddnum);

  const click = (e) => {
    onClicked(made);
  }
  
  //const icon = made ? <AddCircleOutlineIcon/> : <HighlightOffIcon/>;startIcon={icon}

  return (
    <span>
      <Button
          variant="contained"
          color="primary"
          
          onClick={click}
        >
          Made {num} Putts
      </Button>
    </span>
  )
}

const PuttSubmitBtns = ({onClicked}) => (
<div>
  <SubmitBtn onClicked = {onClicked} made = {true}/>
  <SubmitBtn onClicked = {onClicked} made = {false}/>
</div>
)

export default PuttSubmitBtns;