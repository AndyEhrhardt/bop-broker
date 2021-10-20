import { makeStyles } from '@material-ui/core/styles';


const songStyles = makeStyles(() => ({
    buttonDiv:{
        display: 'flex',
        justifyContent: 'center'
    },
    forInputBuyWrap:{
        diplay: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: 200,
        minWidth: 150
    },

    inputPrice:{
        maxWidth: 250,
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 5
    },
    buyTitle:{
        textAlign: 'center'
    },
    grayLine: {
        height: "1px",
        maxHeight: "1px",
        backgroundColor: "gray",
        borderBottom: 10,
        opacity: .5
    },
    buySellAndDetails:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title : {
        fontFamily: 'roboto',
        fontSize: 50
    },
    innerModalWrap:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        backgroundColor: 'white',
        p: 4,
        height: '60%',
        borderRadius: 5,
        padding: 15
    },
    paperWrap:{
        minWidth: 500,
        maxWidth: 400,
        backgroundColor: 'white'
    },
    addPadd:{
        padding: 10,
        height: 280
    },
    mainDetailsWrapper:{
        padding: 10,
        maxWidth: 290
    }
}));





export default songStyles;