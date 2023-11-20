import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  document: {},
  page: {
    padding: 30,
    fontFamily: "Ubuntu",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 22,
  },
  legend: {
    marginBottom: 10,
    color: "#2581c4",
    textAlign: "left",
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  areaInfo: {
    gap: 5,
    marginBottom: 20,
    borderColor: "#2581c4",
    borderRadius: 8,
    borderWidth: 3,
    padding: 16,
    width: "100%",
    minHeight: 180,
  },
  column: {
    display: "flex",
    flexDirection: "row",
  },
  footer: {
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  line: {
    flexDirection: "row",
    maxWidth: "85%",
    gap: 8,
  },
  label: {},
  text: {},
  perfil: {
    maxWidth: 135,
    maxHeight: 180,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid #bfc1c2",
    aspectRatio: 3 / 4,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
