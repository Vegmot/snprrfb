import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';

export const useFirestoreDoc = ({ query, data, dependencies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      snapshot => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: 'not-found',
              message: 'Could not find the document',
            })
          );
          return;
        }

        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      error => dispatch(asyncActionError())
    );
    return () => {
      unsubscribe();
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};
