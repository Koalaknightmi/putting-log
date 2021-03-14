import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import testperms from '../../utils/pathPermissions'
import ROUTES from '../../static/routes';

const makePagePrivate = (Page,route) => props => {
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const history = useHistory()
  useEffect(()=>{
    if(!testperms(ROUTES[route],isLoaded(auth),isEmpty(auth),profile,auth)){
      history.push("/wrongPermissionsPage")
    }
  })

  return (
    <Page {...props}/>
  )
}

export default makePagePrivate