import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function TaskHookForm({ kisiler, submitFn }) {
  const { register, handleSubmit, formState: { errors, isValid },  reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });

  const submitFormData = (formData, e) => {
    console.log("data>>", formData, e);
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
    setTimeout(()=>{
      toast.success('Kaydedilme işlemi başarılı.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    },100)
  };

  return (
    <form onSubmit={handleSubmit(submitFormData)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title" ,{required: "Task başlığı yazmalısınız", minLength:{ value: 3, message: "Task başlığı en az 3 karakter olmalı" }})}

        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
       
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {required: "Task açıklaması yazmalısınız", minLength:{ value: 10 , message: "Task açıklaması en az 10 karakter olmalı" }})}
        ></textarea>
        {errors.description && <p className="input-error">{errors.description.message}</p> }
       
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                
                {...register("people",{required:"Lütfen en az bir kişi seçin",maxLength:{value:3, message:"En fazla 3 kişi seçebilirsiniz"}})}
                /* onChange={handleCheckboxChange}
                checked={formData.people.includes(p)} */
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && <p className="input-error">{errors.people.message}</p>}
        {/* <p className="input-error">{formErrors.people}</p> */}
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>

      
    </form>
  );
}
