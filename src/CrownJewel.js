import GrayIcon from './webinterviews-main/icons/dashboard.svg'
import RedIcon from './webinterviews-main/icons/dashboard-3.png'
import BlueIcon from './webinterviews-main/icons/dashboard-1.png'
import GreenIcon from './webinterviews-main/icons/dashboard-2.png'

function CrownJewel({isCrownJewel, crownJewelIndicator}) {

  if (!isCrownJewel && crownJewelIndicator === 'OVERRIDE') {
    return <img src={BlueIcon} alt="blue icon"/>
  } else if (isCrownJewel && crownJewelIndicator === 'OVERRIDE') {
    return <img src={RedIcon} alt="red icon"/>
  } else if (isCrownJewel) {
    return <img src={GreenIcon} alt="green icon"/>
  }

  return <img src={GrayIcon} alt="gray icon"/>
  
}

export default CrownJewel;
