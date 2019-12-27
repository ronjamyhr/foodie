// import { Dispatch } from 'react'
import { AppState } from '../..'

export const markYourFavoritePlace = (favoritesData: { favorite: boolean; placeName: string; username: string }) => {
  return (dispatch: any, getState: () => AppState, { getFirestore }: any) => {
    const firestore = getFirestore()
    firestore
      .collection('favorites')
      .add({
        ...favoritesData,
      })
      .catch((error: any) => {})
  }
}
