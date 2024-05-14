"use client";
import { useUpdateRoomMutation } from "../../redux/api/roomApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IRoom } from "../../backend/models/room";
import FalseButton from "../FalseButton/FalseButton";
import styles from "./UpdateRoom.module.css";

interface Props {
  data: {
    room: IRoom;
  };
  onClick?: () => void;
}

const UpdateRoom = ({ data, onClick }: Props) => {
  const room = data?.room;

  const [roomDetails, setRoomDetails] = useState({
    name: room?.name,
    price: room?.pricePerNight,
    description: room?.description,
    address: room?.address,
    category: room?.category,
    guestCapacity: room?.guestCapacity,
    numOfBeds: room?.numOfBeds,
    internet: room?.isInternet,
    breakfast: room?.isBreakfast,
    airConditioned: room?.isAirConditioned,
    petsAllowed: room?.isPetsAllowed,
    roomCleaning: room?.isRoomCleaning,
    googleMapsUrl: room?.googleMapsUrl,
  });

  const {
    name,
    price,
    description,
    address,
    category,
    guestCapacity,
    numOfBeds,
    internet,
    breakfast,
    airConditioned,
    petsAllowed,
    roomCleaning,
    googleMapsUrl,
  } = roomDetails;

  const router = useRouter();

  const [updateRoom, { isLoading, error, isSuccess }] = useUpdateRoomMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("Room updated");
      // router.push("/admin/rooms");
    }
  }, [error, isSuccess, router]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roomData = {
      name,
      pricePerNight: price,
      description,
      address,
      googleMapsUrl,
      category,
      guestCapacity: Number(guestCapacity),
      numOfBeds: Number(numOfBeds),
      isInternet: internet,
      isBreakfast: breakfast,
      IsAirConditioned: airConditioned,
      IsPetsAllowed: petsAllowed,
      IsRoomCleaning: roomCleaning,
    };

    updateRoom({ id: room._id, body: roomData });
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setRoomDetails({
      ...roomDetails,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  // const roomFeatures: { name: string; value: keyof typeof roomDetails }[] = [
  //   { name: "Internet", value: "internet" },
  //   { name: "Breakfast", value: "breakfast" },
  //   { name: "Air Conditioned", value: "airConditioned" },
  //   { name: "Pets Allowed", value: "petsAllowed" },
  //   { name: "Room Cleaning", value: "roomCleaning" },
  // ];

  return (
    <div>
      <h2 className={styles.heading}>Update Room</h2>
      <form
        className={styles.container}
        onSubmit={submitHandler}
        encType='multipart/form-data'
      >
        <div className={styles.lableInputBox}>
          <label htmlFor='name_field' className='form-label'>
            Name
          </label>
          <input
            type='text'
            id='name_field'
            className='form-control'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.lableInputBox}>
          <label htmlFor='price_field' className='form-label'>
            Price
          </label>
          <input
            type='text'
            id='price_field'
            className='form-control'
            name='price'
            value={price}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.lableInputBox}>
          <label htmlFor='description_field' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='description_field'
            rows={8}
            name='description'
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className={styles.lableInputBox}>
          <label htmlFor='address_field' className='form-label'>
            Address
          </label>
          <input
            type='text'
            id='address_field'
            className='form-control'
            name='address'
            value={address}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.lableInputBox}>
          <label htmlFor='googleMapsUrl_field' className='form-label'>
            Google Maps URL
          </label>
          <input
            type='text'
            id='googleMapsUrl_field'
            className='form-control'
            name='googleMapsUrl'
            value={googleMapsUrl}
            onChange={onChange}
            required
          />
        </div>

        <div className={styles.lableInputBox}>
          <label htmlFor='room_type_field' className='form-label'>
            Category
          </label>
          <select
            className='form-select'
            id='room_type_field'
            name='category'
            value={category}
            onChange={onChange}
          >
            {["King", "Single", "Twins"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.lableInputBox}>
          <label htmlFor='guest_field' className='form-label'>
            Guest Capacity
          </label>
          <select
            className='form-select'
            id='guest_field'
            name='guestCapacity'
            value={guestCapacity}
            onChange={onChange}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.lableInputBox}>
          <label htmlFor='numofbeds_field' className='form-label'>
            Number of Beds
          </label>
          <select
            className='form-select'
            id='numofbeds_field'
            name='numOfBeds'
            value={numOfBeds}
            onChange={onChange}
          >
            {[1, 2, 3].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* <label className='mb-3'>Room Features</label> */}

        {/* {roomFeatures?.map((feature) => (
            <div className='form-check' key={feature.name}>
              <input
                className='form-check-input'
                type='checkbox'
                id={feature.name}
                name={feature.value}
                onChange={onChange}
                checked={!!roomDetails[feature.value]}
              />
              <label className='form-check-label' htmlFor={feature.name}>
                {feature.name}
              </label>
            </div>
          ))} */}

        {/* <button
            type='submit'
            className='btn form-btn w-100 py-2'
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "UPDATE"}
          </button> */}
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='secondary'
            text={isLoading ? "Updating..." : "Update"}
            onClick={onClick}
          />
        </div>
      </form>
    </div>
  );
};
export default UpdateRoom;
