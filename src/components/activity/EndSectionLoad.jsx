import "../../index.css";
import { CardFlip } from "./CardFlip";


export function EndSectionLoad({ image }) {
  return (
     <div className='relative flex items-center justify-center h-screen'>
      <img className='w-full h-full object-cover' src={image} alt='background' />
     <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center  justify-center'>
        <CardFlip></CardFlip>
      </div>
    </div>
  );
}