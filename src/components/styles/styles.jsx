import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@mui/material/colors';



const useStyles = makeStyles(() => ({
    smallComponentsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: 'space-around'
      },
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
        padding: 5,
        borderRadius: 5,
        backgroundColor: "white",
        transition: '0.2s',
        "&:hover": {
          backgroundColor: '#f2f2f2',
        }
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
    headerPort:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    quickPortfolio:{
        
    },
    quickChartWrapper: {
      maxWidth: 310,
      minWidth: 310,
      maxHeight: 378,
      minHeight: 378,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 50,
      fontWeight: 200
    },
    chartListWidth: {
      width: 130,
      maxWidth: 130,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right',
      padding: 0 
    },
    tableCellSongArtist:{
      width: 150,
      maxWidth: 150,
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
    hoverOnOverview:{
      "&:hover": {
        backgroundColor: '#f2f2f2',
      },
      borderRadius: 5,
      padding: 5,
      backgroundColor: "white",
      transition: '0.2s',
    },
    tableCellPrice:{
      width: 20,
      maxWidth: 30,
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
    quickPortfolioInfo:{
      fontFamily: 'roboto',
      fontSize: 15,
      margin: 0
    },
    inlineInfo:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    quickPortColMaster:{
      display: 'flex',
      textAlign: 'left',
      gap: 10,
      paddingRight: 5
    },
    quickPortColRight:{
      display: 'flex',
      textAlign: 'right',
      gap: 10
    },
    quickPortColInfo:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 10.2
    },
    quickPortColInfoLeft:{
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    },
    quickPortGap:{
      display: 'flex',
      justifyContent: 'space-between',
      width: '50%'
    },
    divider:{
      backgroundColor: '#b0b0b0',
      minWidth: 1,
      maxWidth: 1,
      opacity: .5
    },
    quickPortMaster: {
      display: 'flex'
    },
    quickSubTitle:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      fontSize: 15,
      paddingTop: 6
    },
    quickSubTitle1:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap:15,
      fontSize: 15,
      paddingTop: 0,
      paddingBottom: 0
    },
    quickSubTitle2:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap:15,
      fontSize: 15,
      paddingTop: 6,
      maxWidth: '50%',
      minWidth: '50%'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    green: {
      fontColor: 'green'
    }, 
    red: {
      fontColor: 'red'
    },
    portTableCellSongArtist: {
      width: 100,
      maxWidth: 80,
      paddingRight: 0
    }
}))

export default useStyles;