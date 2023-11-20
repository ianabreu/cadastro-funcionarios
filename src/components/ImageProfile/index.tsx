import styles from "./image-profile.module.css";
import avatar from "../../assets/avatar.png";
interface ImageProfileProps {
  src: string;
  small?: boolean;
}
export function ImageProfile({ src, small = false }: ImageProfileProps) {
  return (
    <div className={`${styles.imageArea} ${small && styles.small}`}>
      <img src={src ? src : avatar} alt="Imagem do perfil" />
    </div>
  );
}
