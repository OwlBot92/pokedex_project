import React from 'react';
import Lottie from 'react-lottie';
import pokeballLoading from '../../assets/lottieJson/pokeballLoading.json';



const LottieLoading = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pokeballLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Lottie options={defaultOptions} height={200} width={200} />
      <span style={{ fontSize: '35px', marginTop: 40, color: '#dddddd' }}>POKELOADING</span>
    </div>
  );
}

export default LottieLoading;