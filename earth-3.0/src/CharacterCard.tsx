import {useState} from "react";
import "./css/Characters.css";

const CharacterCard = () => {


    return (
        <div className="grid grid-cols-1 gap-y-10">
            <div className="grid grid-cols-4 gap-x-5 parent ">

                <div className="bg-[url('/public/dawn.png')] bg-cover bg-[position:top]">
                    Dawn
                </div>

                <div className="bg-[url('/public/quan.png')] bg-cover bg-[position:top]">
                    Quan
                </div>

                <div className="bg-[url('/public/chronos.png')] bg-cover bg-[position:top]">
                    Chronos
                </div>

                <div className="bg-[url('/public/eros.png')] bg-cover bg-[position:top]">
                    Eros
                </div>

            </div>

            <div className="grid grid-cols-[repeat(auto-fit,_25%)] justify-center gap-x-5 parent">


                <div className="bg-[url('/public/pryme.png')] bg-cover bg-[position:top]">
                    Pryme
                </div>

                <div className="bg-white bg-[url('/public/schrodinger-Photoroom.png')] bg-cover bg-[position:top]">
                    Schrodinger
                </div>

                <div className="bg-[url('/public/vega.png')] bg-cover bg-[position:top]">
                    Vega
                </div>

            </div>



        </div>

    )
}

export default CharacterCard;