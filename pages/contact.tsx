import React, { useEffect } from "react";
import styles from "../styles/ContactPage.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    if (Object.keys(errors).length === 0) {
      submitMessage(data);
    }
  };

  const submitMessage = async (data: any) => {
    try {
      const response = await fetch("/api/AddMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.message == "Success") {
        toast("Message Sent!", {
          position: "bottom-right",
          type: "success",
          theme: "dark",
        });
        reset();
      }
    } catch (err) {
      console.log(`Submit Message Error`, err);
    }
  };

  return (
    <div className={styles.contactcontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          <Image src="/images/test.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.bgoverlay}></div>
        <div className={styles.bannercontent}>
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 w-full mx-auto max-w-screen-lg">
        <div className="col-span-3">
          <h1 className="heading1 mb-8">Interested in working with us?</h1>
          <div className={styles.addressbox}>
            <strong className="uppercase inline-block pb-2 text-primary">
              Regd. Office Address
            </strong>
            <p>
              6-1/16-13/1, Peddi raju Street, Chitti Nagar, One Town,
              Vijayawada, Krishna District, Andhra Pradesh, PIN: 520001, India
            </p>
          </div>
          <div className={styles.addressbox}>
            <strong className="uppercase inline-block pb-2 text-primary">
              Corporate Headquarters
            </strong>
            <p>808 Chestnut St, PMB 1024, Chattanooga, TN 37402</p>
          </div>
        </div>
        <div className="col-span-3">
          <h2 className="heading1">Send us a message</h2>
          <form className="form1" onSubmit={handleSubmit(onSubmit)}>
            <div className="formgroup">
              <label>
                Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                {...register("name", { required: true })}
              />
              {errors.name && <span className="errors">Name is required</span>}
            </div>
            <div className="formgroup">
              <label>
                Organization <span>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                {...register("organization", { required: true })}
              />
              {errors.organization && (
                <span className="errors">Organization is required</span>
              )}
            </div>
            <div className="formgroup">
              <label>
                Email <span>*</span>
              </label>
              <input
                type="email"
                className="form-input"
                {...register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />
              {errors.email?.type == "required" && (
                <span className="errors">Email is required</span>
              )}
              {errors.email?.type == "pattern" && (
                <span className="errors">Email is invalid</span>
              )}
            </div>
            <div className="formgroup">
              <label>Mobile</label>
              <input
                type="tel"
                className="form-input"
                {...register("mobile")}
              />
            </div>
            <div className="formgroup">
              <label>Message</label>
              <textarea
                rows={4}
                className="form-textarea"
                {...register("message")}
              ></textarea>
            </div>
            <button className="button1 my-1" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
