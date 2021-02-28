
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                // decomment the following and add coordinates:
                // lat: <your-latitude>,
                // lng: <your-longitude>,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.8 0.8 0.8',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.8 0.8 0.8',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
    {
        url: './assets/ata/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Ataberk Friend1 Stature',
    },
    {
        url: './assets/ata/scene1.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Ataberk Friend2 Stature',
    },
    {
        url: './assets/ata/pink.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Horns Stature',
    },
    {
        url: './assets/ata/animated.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Horns Stature',
    },
    {
        url: './assets/ata/horns.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Horns Stature',
    }
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        let image = document.createElement('a-image');
        image.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);
        setModel(models[modelIndex], image);

        model.setAttribute('animation-mixer', '');
        image.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
        scene.appendChild(image);
    });
}
