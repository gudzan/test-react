import { useEffect, useState } from "react";
import { usePutProductsMutation } from "../redux/productsApi";
import products from "../mockData/products.json"

const useMockData = () => {
  const statusConsts = {
      idle: "Еще не начали",
      pending: "В процессе",
      successed: "Готово",
      error: "Ошибка!"
  };
  const [putProducts] = usePutProductsMutation()
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = products.length;
  const incrementCount = () => {
      setCount((prevState) => prevState + 1);
  };
  const updateProgress = () => {
      if (count !== 0 && status === statusConsts.idle) {
          setStatus(statusConsts.pending);
      }
      const newProgress = Math.floor((count / summaryCount) * 100);
      if (progress < newProgress) {
          setProgress(() => newProgress);
      }
      if (newProgress === 100) {
          setStatus(statusConsts.successed);
      }
  };

  useEffect(() => {
      updateProgress();
  }, [count]);

  async function initialize() {
      try {

          for (const p of products) {
            putProducts({...p});
            incrementCount();
        }
      } catch (error : any) {
          setError(error);
          setStatus(statusConsts.error);
      }
  }

  return { error, initialize, progress, status };
};

export default useMockData;