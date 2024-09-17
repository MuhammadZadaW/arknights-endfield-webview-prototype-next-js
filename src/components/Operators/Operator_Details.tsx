'use client'
import React, { useEffect, useState, useRef } from "react";
import datas from "@public/json/datas.json"
import Image from "next/image"
import Link from "next/link"

const Operator = ({operator}: {operator: string}) => {

    const [enabled, setEnabled] =  useState(false)
    const [isPlayFirst, setIsPlayFirst] = useState(true)
    const [play, setPlay] = useState(true)
    const [a, setA] = useState(true)

    const videoPlayerRef = useRef(null)
    const data = datas.filter((data) => data.codename.replace(" ", "_") === operator)[0]

    useEffect(() => {
        const videoId: any = videoPlayerRef.current

        const handleEndedVideo = () => {
            if (videoId) {
                if (isPlayFirst) {
                  setEnabled(true)
                  setIsPlayFirst(false)
                } else {
                  setPlay(!play)
                }
            }
        }

        if (videoId) {
            videoId.addEventListener("ended", handleEndedVideo)
        }

        return () => {
            if (videoId) {
                videoId.removeEventListener("ended", handleEndedVideo)
            }
        }
    })

    const handelPlayPauseVideo = () => {
      const videoId: any = videoPlayerRef.current
      if (videoId) {
          console.log(play)
          if (play) {
            videoId.pause()
          } else {
            videoId.play()
          }
          setPlay(!play)
      }
    }

    const handelReplayVideo = () => {
      const videoId: any = videoPlayerRef.current
      if (videoId) {
          videoId.currentTime = 0
          videoId.play()
      }
    }

    if (data === undefined) {
        return(
            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                <div className="flex flex-col gap-7.5">
                    <p className="text-black">Operators Not Found</p>
                    <Link href="/operators" className="hover:text-sky-700">Back to Operators List</Link>
                </div>
            </div>
        )
    }

    return(
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Operator
                </h3>
              </div>
              <div className="p-7 min-h-[950px]">
                {data.codename !== "Endministrator" ? 
                <div>
                  <div className="pb-7">
                    <label
                        htmlFor="toggle4"
                        className="flex cursor-pointer select-none items-center"
                    >
                        <div className="relative">
                          <input
                              type="checkbox"
                              id="toggle4"
                              className="sr-only"
                              onChange={() => {
                                  setEnabled(!enabled);
                                  handelReplayVideo()
                              }}
                          />
                        <div className="block h-8 w-14 rounded-full bg-black" />
                        <div
                            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition 
                                ${enabled && "!right-1 !translate-x-full"}
                            `} 
                        />
                        </div>
                    </label>
                  </div>
                  <div className="mb-4 flex items-center gap-3 text-center">
                    <div className="rounded-full" hidden={enabled}>
                        <video 
                            onClick={handelPlayPauseVideo}
                            ref={videoPlayerRef}
                            autoPlay
                            // width={720}
                            // height={900}
                            width={400}
                            height={"auto"}
                            muted
                        >
                            <source src={"/videos/endfield-operators-videos/" + data.video}/>
                        </video>
                    </div>
                    <div className="rounded-full" hidden={!enabled}>
                        <Image
                            src={"/images/endfield-operators-img/" + data.img}
                            // width={602}
                            // height={1200}
                            width={400}
                            height={0}
                            layout="intrinsic"
                            alt={data.codename}
                        />
                    </div>
                  </div>
                </div>
                : 
                <div>
                  <div className="mb-4 flex items-center gap-3 text-center" onClick={() => setA(!a)}>
                    <div className="rounded-full" hidden={!a}>
                        <Image
                            src={"/images/endfield-operators-img/" + data.img + "_A.jpg"}
                            width={400}
                            height={0}
                            layout="intrinsic"
                            alt={data.codename + "_A"}
                        />
                    </div>
                    <div className="rounded-full" hidden={a}>
                        <Image
                            src={"/images/endfield-operators-img/" + data.img + "_B.jpg"}
                            width={400}
                            height={0}
                            layout="intrinsic"
                            alt={data.codename + "_B"}
                        />
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7 min-h-[950px] text-black">
                <table className="w-full table-fixed">
                  <tbody>
                    <tr>
                      <td>
                        <p className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                          Name
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.codename}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                          Rarity
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.rarity}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                          Race
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.race}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                          Gender
                        </p>
                      </td>
                      <td className="max-w-[150px] border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.gender}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                          Faction
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.faction}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                          Weapon
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.weapon}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                          Class
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.class}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="py-5">
                  <hr />
                  <p className="py-3">{data.text?.tag_name}</p>
                  <p className="whitespace-pre-line">{data.text?.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Operator