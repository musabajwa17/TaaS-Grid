export const prettyDate = (date) => {
try {
return new Date(date).toLocaleDateString("en-US", {
month: "short",
day: "numeric",
year: "numeric",
});
} catch (e) {
return console.error("Invalid date:", e);
}
};