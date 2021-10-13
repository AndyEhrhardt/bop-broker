import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(() => ({
    
    quickChartTitle: {
        fontFamily: 'Roboto',
        fontSize: 35,
        margin: 0,
        fontWeight: 300,
        paddingTop: 10
      }, 
    doesThisWork: {
      backgroundColor: 'red',
    },
    songName: {
      width: 130,
      maxWidth: 130,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right',
      paddingRight: 0
    },
    quickChartWrapper: {
      maxWidth: 290,
      minWidth: 280,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 50,
      fontWeight: 100,
    },
    tableCellSongArtist:{
      width: 130,
      maxWidth: 130,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right',
      padding: 0,
    },
    tableRow:{
      maxHeight: 52,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right'
    },
    tableCellPrice:{
      width: 20,
      maxWidth: 20,
    },
    detailsSongTitle:{
      fontFamily: 'Roboto',
      fontSize: 40,
      margin: 0,
      fontWeight: 500,
      paddingTop: 5
    },
    detailsArtist:{
      fontFamily: 'Roboto',
      fontSize: 37,
      margin: 0,
      fontWeight: 400,
      paddingTop: 5
    },
    detailsRank:{
      fontFamily: 'Roboto',
      fontSize: 30,
      margin: 0,
      fontWeight: 300,
      paddingTop: 5
    },
    detailsSubRank:{
      fontFamily: 'Roboto',
      fontSize: 20,
      margin: 0,
      fontWeight: 300,
      paddingTop: 0
    },
    mainDetailsWrapper:{
    
    },
    avilableFonts:{
      fontFamily: 'Open Sans',
      fontFamily: 'Roboto', 
    },
}))

export default useStyles;