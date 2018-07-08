function MineSweeper(element) {
    this.container = document.querySelector(element);
    this.mineField = this.container.querySelector(".field");
    this.fieldSize = 10;
    this.mineCount = 10;
    this.mine = "M";
    this.safe = 0;
    this.mineArray = new Array();
}

MineSweeper.prototype = {
    init: function() {
        this.setFields(this.fieldSize);
        this.setMine(this.mineCount);
        this.getMineNumber();
        this.renderFields();
    },
    setFields: function(fieldSize) {
        for (var i = 0; i < fieldSize; i++) {
            this.mineArray[i] = new Array(fieldSize);
            for (var j = 0; j < this.mineArray[i].length; j++) {
                this.mineArray[i][j] = this.safe;
            }
        }
    },
    setMine: function(mineCount) {
        var row;
        var col;

        while (mineCount-- > 0) {
            row = parseInt(Math.random() * this.fieldSize);
            col = parseInt(Math.random() * this.fieldSize);

            if (this.mineArray[row][col] !== this.mine) {
                this.mineArray[row][col] = this.mine;
            }
        }
    },
    getMine: function(i, j) {
        for (var row = i - 1; row <= i + 1; row++) {
            for (var col = j - 1; col <= j + 1; col++) {
                if (
                    row >= 0 &&
                    row < this.fieldSize &&
                    col >= 0 &&
                    col < this.fieldSize &&
                    this.mineArray[row][col] !== this.mine
                ) {
                    this.mineArray[row][col]++;
                }
            }
        }
    },
    getMineNumber: function() {
        for (var row = 0; row < this.fieldSize; row++) {
            for (var col = 0; col < this.fieldSize; col++) {
                if (this.mineArray[row][col] === this.mine) {
                    this.getMine(row, col);
                }
            }
        }
    },
    renderFields: function() {
        var fields = "";
        var mineTypes;

        for (var row = 0; row < this.fieldSize; row++) {
            fields += "<tr>";
            for (var col = 0; col < this.mineArray[row].length; col++) {
                mineTypes = this.mineArray[row][col];

                if (mineTypes === this.mine) {
                    mineTypes = "<span class='mine'>" + this.mine + "</span>";
                } else if (mineTypes === this.safe) {
                    mineTypes = " ";
                } else {
                    mineTypes =
                        "<span class='count" +
                        mineTypes +
                        "'>" +
                        mineTypes +
                        "</span>";
                }

                fields += "<td>" + mineTypes + "</td>";
            }
            fields += "</tr>";
        }
        this.mineField.innerHTML = fields;
    }
};
