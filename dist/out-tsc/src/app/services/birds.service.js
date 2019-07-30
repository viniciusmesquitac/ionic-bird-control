import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
var BirdsService = /** @class */ (function () {
    function BirdsService(afs) {
        this.afs = afs;
        this.birdCollection = this.afs.collection('bird', function (ref) { return ref.orderBy("name", "asc").limit(10); });
        this.birds = this.birdCollection.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
    }
    BirdsService.prototype.getBirds = function () {
        return this.birds;
    };
    BirdsService.prototype.getBird = function (id) {
        return this.birdCollection.doc(id).valueChanges().pipe(take(1), map(function (bird) {
            bird.id = id;
            return bird;
        }));
    };
    BirdsService.prototype.getFemaleBirds = function () {
        this.birdCollection = this.afs.collection('bird', function (ref) { return ref.where(('gender'), '==', 'Female'); });
        this.birdsFemale = this.birdCollection.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
        return this.birdsFemale;
    };
    BirdsService.prototype.getMaleBirds = function () {
        this.birdCollection = this.afs.collection('bird', function (ref) { return ref.where(('gender'), '==', 'Male'); });
        this.birdsMale = this.birdCollection.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
        return this.birdsMale;
    };
    BirdsService.prototype.addBird = function (bird) {
        return this.birdCollection.add(bird);
    };
    BirdsService.prototype.updateBird = function (bird) {
        return this.birdCollection.doc(bird.id).update({ name: bird.name, gender: bird.gender, couple: bird.couple,
            color: bird.color, lineage: bird.lineage, father: bird.father, mother: bird.mother });
    };
    BirdsService.prototype.deleteBird = function (id) {
        return this.birdCollection.doc(id).delete();
    };
    BirdsService.prototype.searchBird = function (filter) {
        if (filter.length !== 0) {
            console.log('test filter');
            this.birdCollection = this.afs.collection('bird', function (ref) { return ref.where(('name'), '==', filter); });
            this.birds = this.birdCollection.snapshotChanges().pipe(map(function (actions) {
                return actions.map(function (a) {
                    var data = a.payload.doc.data();
                    var id = a.payload.doc.id;
                    return tslib_1.__assign({ id: id }, data);
                });
            }));
        }
        else if (filter.length === 0) {
            this.birdCollection = this.afs.collection('bird');
            this.birds = this.birdCollection.snapshotChanges().pipe(map(function (actions) {
                return actions.map(function (a) {
                    var data = a.payload.doc.data();
                    var id = a.payload.doc.id;
                    return tslib_1.__assign({ id: id }, data);
                });
            }));
            console.log('you aren\'t filtering');
        }
    };
    BirdsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], BirdsService);
    return BirdsService;
}());
export { BirdsService };
//# sourceMappingURL=birds.service.js.map