import styles from "./form-input-image.module.css";
import { ChangeEvent, useState } from "react";
import avatar from "../../../assets/avatar.png";
import { Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
type FormInputImageProps = {
  setImage: (file: File) => void;
  urlImage?: string;
};

export const FormInputImage = ({ setImage, urlImage }: FormInputImageProps) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length !== 1) {
      return toast.error("Erro ao ler o arquivo.");
    }

    if (!e.target.files[0].type.startsWith("image/")) {
      return toast.error("Formato de arquivo inválido!");
    }
    if (e.target.files[0].size > 1048577) {
      return toast.error("Tamanho máximo de imagem 1MB");
    }
    let url = URL.createObjectURL(e.target.files[0]);
    setFileURL(url);
    setImage(e.target.files[0]);
  }
  return (
    <div className={styles.container}>
      <Button variant="text" component="label">
        <Upload />
        Escolher Foto
        <input type="file" accept="image/*" hidden onChange={handleChange} />
      </Button>
      <div className={styles.perfil}>
        <img
          src={fileURL ? fileURL : urlImage ? urlImage : avatar}
          alt="Foto de Perfil"
        />
      </div>
    </div>
  );
};
