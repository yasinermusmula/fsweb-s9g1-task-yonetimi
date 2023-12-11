import React from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { title: "", description: "", people: [] },
    mode: "onChange",
  });
  const notify = () => toast("Tebrikler");

  const onFormSubmit = (formData) => {
    console.log(formData);
    submitFn({
      ...formData,
      status: "yapılacak",
    });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-line">
        <label className="input-label">Baslik</label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Başlık en az 3 karakter içermelidir",
            },
          })}
        />
        {errors.title && <p> {errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">Aciklama</label>
        <textarea
          {...register("description", {
            required: "Açıklama boş bırakılmaz",
            minLength: {
              value: 10,
              message: "Mesaj en az 10 karakter içermelidir.",
            },
          })}
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
        ></textarea>
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((key) => (
            <label className="input-checkbox" key={key}>
              <input
                type="checkbox"
                name="people"
                value={key}
                {...register("people", {
                  required: "En az bir seçim yapınız",
                  maxLength: { value: 3 },
                  minLength: { value: 1 },
                })}
              />
              {key}
            </label>
          ))}
          {errors.people && <p>{errors.people.message}</p>}
        </div>
      </div>

      <div className="form-line">
        <button
          onClick={notify}
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
