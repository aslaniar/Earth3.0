import {useState} from "react";
import "./css/Characters.css";

const CharacterCard = () => {


    return (
        <div className="grid grid-cols-1 gap-y-10">
            <div className="grid grid-cols-4 gap-x-5 parent ">

                <div className="bg-[url('/public/dawn.png')] bg-contain bg-center bg-no-repeat">
                    Dawn
                </div>

                <div className="bg-[url('/public/quan.png')] bg-contain bg-center bg-no-repeat">
                    Quan
                </div>

                <div className="bg-[url('/public/chronos.png')] bg-contain bg-center bg-no-repeat">
                    Chronos
                </div>

                <div className="bg-[url('/public/eros.png')] bg-contain bg-center bg-no-repeat">
                    Eros
                </div>

            </div>

            <div className="grid grid-cols-[repeat(auto-fit,_25%)] justify-center gap-x-5 parent">


                <div className="bg-[url('/public/pryme.png')] bg-contain bg-center bg-no-repeat">
                    Pryme
                </div>

                <div className="bg-white bg-[url('/public/schrodinger-Photoroom.png')] bg-center bg-no-repeat">
                    Schrodinger
                </div>

                <div className="bg-[url('/public/vega.png')] bg-contain bg-center bg-no-repeat">
                    Vega
                </div>

            </div>



        </div>

    )
}

export default CharacterCard;