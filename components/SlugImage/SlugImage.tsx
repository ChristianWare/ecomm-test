import styles from './SlugImage.module.css'
import Image from 'next/image'

const SlugImage = ({ src='/' }) => {
  return (
    <div className={styles.imgContainer}>
        <Image src={src} alt='img' fill className={styles.img} />
    </div>
  )
}
export default SlugImage