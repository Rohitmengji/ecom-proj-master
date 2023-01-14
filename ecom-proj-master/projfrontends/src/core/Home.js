import React, {Fragment, useState, useEffect ,useRef  , Component} from "react";
import Menu from './Menu'
import Index from "./Index";
import Footer from "./Footer";

export default function Home() {

  return (

    <div >
    

          <Menu />
          <Index />
          <Footer /> 
 
    </div>
  );
}

