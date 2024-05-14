import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loader;
