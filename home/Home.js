import React, { Suspense, useRef } from "react";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import Reward from "react-rewards";

import { Bear } from "./Bear";
import { Lights } from "./Lights";
import { Effects } from "./Effects";
import { Loading } from "./Loading";
import { Controls } from "./Controls";
import { Logo } from "./Logo";
import { Stars } from "./Stars";
import { Grayscale } from "./Grayscale";
import { throttle } from "./helpers/throttle";

import "./styles.css";

extend({
  OrbitControls,
  EffectComposer,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
  FilmPass,
  SMAAPass
});

const DEFAULT_LAYER = 0;
const OCCLUSION_LAYER = 1;

const Home = () => {
  const reward = useRef(null);

  const handleBellyClick = throttle(() => {
    if (reward && reward.current) {
      reward.current.rewardMe();
    }
  }, 1500);

  return (
    <>
    <Reward
        ref={reward}
        type="emoji"
        config={{
          springAnimation: false,
          lifetime: 160,
          startVelocity: 66,
          spread: 160,
          emoji: ["🔋", "🔋"],
          containerStyle: { transform: "translate3d(50vw, 50vh, 0)" }
        }}
      >
        <span />
      </Reward>
      <Grayscale>
        <Loading />
        
        <Canvas shadowMap camera={{ position: [0, 0, 4.5] }}>
          <Controls />
          <Suspense fallback={null}>
            <Logo />
          </Suspense>
          <Effects />
          <Lights />
          <Suspense fallback={null}>
            <Bear
              layer={DEFAULT_LAYER}
              position={[0, -0.45, 2]}
              scale={[0.2, 0.2, 0.2]}
              onBellyClick={handleBellyClick}
            />
            <Bear
              layer={OCCLUSION_LAYER}
              position={[0, -0.45, 2]}
              scale={[0.2, 0.2, 0.2]}
            />
          </Suspense>
          <Stars />
        </Canvas>
      </Grayscale>
    </>

  );
};

export default Home;
