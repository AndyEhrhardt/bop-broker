import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(() => ({
    
    quickChartTitle: {
        fontFamily: 'Roboto',
        fontSize: 40,
        margin: 0,
        fontWeight: 300
      }, 
    doesThisWork: {
      backgroundColor: 'red',
    },
    songName: {
      width: 150,
      maxWidth: 150,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
}))

export default useStyles;