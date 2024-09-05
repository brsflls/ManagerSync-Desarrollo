import React from 'react';
import { LoadingPageImage } from './components/activity/ImageLoadingPage.jsx';
import { CardLoadingPage } from './components/activity/CardLoading.jsx';
import { EndSectionLoad } from './components/activity/EndSectionLoad.jsx';
export function  LoadingPage() {

  return ( 
    <div>
      <LoadingPageImage image=".\src\assets\image.svg"/>
      <CardLoadingPage image00=".\src\assets\fast.svg" image01=".\src\assets\efficient.svg" image02=".\src\assets\calendar.svg" image03=".\src\assets\users.svg"/>
      <EndSectionLoad image=".\src\assets\image.svg"/>
    </div>
       )
}
