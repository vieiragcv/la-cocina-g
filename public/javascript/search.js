// var countries = [
//     { label: 'United Kingdom', value: 'UK' },
//     { label: 'United States', value: 'US' }
// ];

var input = document.getElementById("recipeSearch");

async function searchRecipes(search, callback) {
    const response = await fetch(`/api/recipes/search/${search}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => callback(data.map(r => ({id: r.id, label: r.recipe_name}))));
};

autocomplete({
    input: input,
    fetch: function(text, update) {
        searchRecipes(text, update)
    },
    onSelect: function(item) {
        console.log(item);
        document.location.replace(`/recipe/${item.id}`);
    }
});

