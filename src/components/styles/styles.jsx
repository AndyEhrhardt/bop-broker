import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@mui/material/colors';



const useStyles = makeStyles(() => ({
      
      quickComponentsContainer : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 30
      },
      quickChartTitle: {
        fontFamily: 'Roboto',
        fontSize: 40,
        margin: 0,
        fontWeight: 400,
        paddingTop: 10
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
      minWidth: 290,
      maxHeight: 378,
      minHeight: 378,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 50,
      fontWeight: 200
    },
    tableCellSongArtist:{
      width: 130,
      maxWidth: 130,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right',
      padding: 0
    },
    tableRow:{
      maxHeight: 52,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right',
      backgroundColor: "white",
      transition: '0.2s',
      "&:hover": {
        backgroundColor: '#f2f2f2',
      }
    },
    tableCellPrice:{
      width: 20,
      maxWidth: 20,
    },
    Typography: {
      fontFamily: 'roboto',
      weight: 100,
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
    portfolioInfo:{
      fontFamily: 'roboto',
      fontSize: 15,
      textAlign: 'left',
      fontWeight: 300
    }
}))

export default useStyles;