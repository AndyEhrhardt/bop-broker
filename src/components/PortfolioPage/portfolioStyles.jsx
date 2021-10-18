import { makeStyles } from '@material-ui/core/styles';
import { CarpenterTwoTone } from '@mui/icons-material';

const portfolioStyles = makeStyles(() => ({
    "@keyframes open": {
        "0%": {
          transform: "translate(-50% ,-200%)"
        },
        "100%": {
        transform: 'translate(-50%, -63%)',
        }
      },
      "@keyframes close": {
        "0%": {
          transform: "translate(-50%, -63%)"
        },
        "100%": {
          transform: "translate(-50 ,-200%)"
        }
      },
    openModalWrap:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        animation: '$open 300ms',
        transform: 'translate(-50%, -63%)',
        width: "80%",
        backgroundColor: '#fbf9f3',
        p: 4,
        height: '80%'
    },
    closeModalWrap:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        animation: '$open 300ms',
        animationDirection: 'reverse',
        transform: 'translate(-50%, -63%)',
        width: "80%",
        backgroundColor: '#fbf9f3',
        p: 4,
        height: '80%'
    },
    grayLine:{
        backgroundColor: 'gray',
        opacity: .5,
        height: 1
    },
    holdingsmaster: {
        display: 'flex',
        justifyContent: 'center'
    },
    holdingsWrapper:{
        minWidth: "95%"
    },
    masterWrap: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        justifyContent: 'center',
        minHeight:  '45%',
        maxHeight: '50%'
    },
    graphwrapper:{
        minWidth: '60%'
        // minHeight: '45%'
    },
    overviewWrapper:{
        // minWidth: 290,
        // maxWidth: 350,
        //maxWidth: 200
    },
    masterOverview:{
        minWidth: 190,
        width: 200,
        maxWidth: 220
    },
    smallComponentsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: 'space-around'
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
    quickPortColRight:{
      display: 'flex',
      textAlign: 'right'
    },
    quickPortColInfo:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    quickPortColInfoLeft:{
      display: 'flex',
      flexDirection: 'column'
    },
    quickPortGap:{
      display: 'flex',
      justifyContent: 'space-between'
    },
    divider:{
      backgroundColor: '#b0b0b0',
      minWidth: 1,
      maxWidth: 1,
      opacity: .5
    },
    quickPortMaster: {
      paddingRight: 10,
      paddingLeft: 10
    },
    quickSubTitle:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      fontSize: 15,
      paddingTop: 6
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
      width: 130,
      paddingRight: 5
    }
}))

export default portfolioStyles;