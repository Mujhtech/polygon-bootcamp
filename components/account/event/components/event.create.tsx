import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch } from "../../../../app/hooks";
import { updateEventAction } from "../../../../features/event";
import SecondaryButton from "../../../btn/SecondaryButton";
import { ClipLoader } from "react-spinners";
import { collection, addDoc } from "firebase/firestore/lite";
import { db, storage } from "../../../../firebase/client";
import { errorAlert, successAlert } from "../../../../app/toast";
import { useAccount } from "wagmi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EventCreate() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("physical");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerImageBlob, setBannerImageBlob] = useState(null);
  const [nftImageUrl, setNftImageUrl] = useState("");
  const [nftImageBlob, setNftImageBlob] = useState(null);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    amount: Yup.number().required("Amount is required"),
    maxTickets: Yup.number().required("Max Ticket is required"),
    content: Yup.string().required("Content is required"),
    eventStartOn: Yup.string().required("Field is required"),
  });

  const hiddenBannerInput = useRef<HTMLInputElement>(null);
  const hiddenNftInput = useRef<HTMLInputElement>(null);
  const { address } = useAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleForm = async (data: any) => {
    try {
      setLoading(true);
      let image = null,
        nftUri = null;

      if (bannerImageBlob != null && bannerImageBlob != "") {
        const imageRef = ref(
          storage,
          `images/${data.title.toLowerCase().replace(" ", "-")}.jpg`
        );
        const snapshot = await uploadBytes(imageRef, bannerImageBlob as Blob);
        image = await getDownloadURL(snapshot.ref);
      }

      if (nftImageBlob != null && nftImageBlob != "") {
        const imageRef = ref(
          storage,
          `nfts/${data.title.toLowerCase().replace(" ", "-")}.jpg`
        );
        const snapshot = await uploadBytes(imageRef, nftImageBlob as Blob);
        nftUri = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "events"), {
        ...data,
        location: location,
        creator: address,
        totalTicketBought: 0,
        image: image,
        nftUri: nftUri,
        eventStartOn: new Date(data.eventStartOn).getTime(),
      });
      reset();
      setNftImageBlob(null);
      setBannerImageBlob(null);
      setBannerImageUrl("");
      setNftImageUrl("");
      setLoading(false);
      dispatch(updateEventAction());
      successAlert("Event created successfully");
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorAlert("Unable to create event");
    }
  };

  const handleBannerFileChange = async (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setBannerImageUrl(url);
    setBannerImageBlob(e.target.files[0]);
  };

  const handleNftFileChange = async (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setNftImageUrl(url);
    setNftImageBlob(e.target.files[0]);
  };

  const getBannerImage = () => {
    if (bannerImageUrl) {
      return bannerImageUrl;
    } else {
      return null;
    }
  };
  const getNftImage = () => {
    if (nftImageUrl) {
      return nftImageUrl;
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-col mx-4">
      <form
        className="mt-4 mx-4 grid grid-cols-1 gap-5"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="flex flex-row md:space-x-6">
          <div className="flex flex-col md:w-1/2">
            <div className="mb-4 flex flex-col space-y-2">
              <label className="text-md text-black">Title</label>
              <input
                type="title"
                className="form-control"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500">
                  {errors.title.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-4  flex flex-col space-y-2">
              <label className="text-md text-black">Amount (MATIC)</label>
              <input
                type="number"
                className="form-control"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-xs text-red-500">
                  {errors.amount.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-4  flex flex-col space-y-2">
              <label className="text-md text-black">
                Maximum number of ticket to rsvp
              </label>
              <input
                type="number"
                className="form-control"
                {...register("maxTickets")}
              />
              {errors.maxTickets && (
                <p className="text-xs text-red-500">
                  {errors.maxTickets.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-4  flex flex-col space-y-2">
              <label className="text-md text-black">Event Start On</label>
              <input
                type="date"
                className="form-control"
                {...register("eventStartOn")}
              />
              {errors.eventStartOn && (
                <p className="text-xs text-red-500">
                  {errors.eventStartOn.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-4 flex flex-col space-y-2">
              <label className="text-md text-black">Location</label>
              <div className="flex flex-row space-x-8">
                <div className="flex items-center mr-4 mb-4">
                  <input
                    id="method1"
                    type="radio"
                    name="method"
                    className="hidden"
                    defaultChecked={location == "physical"}
                    onClick={function (e) {
                      setLocation("physical");
                    }}
                  />
                  <label
                    htmlFor="method1"
                    className="flex items-center cursor-pointer text-md text-support"
                  >
                    <span className="w-4 h-4 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                    Physical
                  </label>
                </div>
                <div className="flex items-center mr-4 mb-4">
                  <input
                    id="method2"
                    type="radio"
                    name="method"
                    className="hidden"
                    defaultChecked={location == "virtual"}
                    onClick={function (e) {
                      setLocation("virtual");
                    }}
                  />
                  <label
                    htmlFor="method2"
                    className="flex items-center cursor-pointer text-md text-support"
                  >
                    <span className="w-4 h-4 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                    Virtual
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4  flex flex-col space-y-2">
              <label className="text-md text-black">Content</label>
              <textarea
                className="form-control min-h-[200px]"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-xs text-red-500">
                  {errors.content.message?.toString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex md:flex-row md:space-x-10">
            <div className="mb-4 flex flex-col space-y-2">
              <label className="text-md text-black">Event Banner</label>
              <div
                className="cursor-pointer w-[200px] h-[200px] inline-flex items-center justify-center  border border-dashed border-grey bg-icon bg-opacity-10 rounded-md bg-cover bg-center bg-no-repeat"
                style={{
                  background: `url(${
                    getBannerImage() ? getBannerImage() : ""
                  })`,
                  backgroundSize: getBannerImage() ? "cover" : "",
                  backgroundRepeat: getBannerImage() ? "no-repeat" : "",
                  backgroundPosition: getBannerImage() ? "center center" : "",
                }}
                onClick={() => hiddenBannerInput.current!.click()}
              >
                <div className="flex flex-col justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={"text-black w-6 h-6"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>

                  <h4 className={"text-black text-xs"}>
                    Click to upload event banner
                  </h4>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleBannerFileChange(e)}
                  ref={hiddenBannerInput}
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col space-y-2">
              <label className="text-md text-black">Nft Image</label>
              <div
                className="cursor-pointer w-[200px] h-[200px] inline-flex items-center justify-center  border border-dashed border-grey bg-icon bg-opacity-10 rounded-md bg-cover bg-center bg-no-repeat"
                style={{
                  background: `url(${getNftImage() ? getNftImage() : ""})`,
                  backgroundSize: getNftImage() ? "cover" : "",
                  backgroundRepeat: getNftImage() ? "no-repeat" : "",
                  backgroundPosition: getNftImage() ? "center center" : "",
                }}
                onClick={() => hiddenNftInput.current!.click()}
              >
                <div className="flex flex-col justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={"text-black w-6 h-6"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>

                  <h4 className={"text-black text-xs"}>
                    Click to upload nft image
                  </h4>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleNftFileChange(e)}
                  ref={hiddenNftInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SecondaryButton
            disabled={loading}
            title="Create event"
            onPressed={function () {}}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={15} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
}
