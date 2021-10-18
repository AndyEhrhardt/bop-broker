import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@mui/material/colors";

const useSmallStyles = makeStyles(() => ({
  quickChartTitle: {
    fontFamily: "Roboto",
    fontSize: 40,
    margin: 0,
    fontWeight: 400,
    paddingTop: 10,
  },
  songName: {
    width: 130,
    maxWidth: 130,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "right",
    paddingRight: 0,
  },
  quickChartWrapper: {
    maxWidth: 280,
    minWidth: 280,
    maxHeight: 378,
    minHeight: 378,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 50,
    fontWeight: 200,
  },
  chartListWidth: {
    width: 130,
    maxWidth: 130,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "right",
    padding: 0,
  },
  tableCellSongArtist: {
    width: 110,
    maxWidth: 110,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "right",
    padding: 0,
  },
  tableRow: {
    maxHeight: 52,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "right",
    backgroundColor: "white",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  tableCellPrice: {
    width: 20,
    maxWidth: 20,
  },
}));

export default useSmallStyles;
