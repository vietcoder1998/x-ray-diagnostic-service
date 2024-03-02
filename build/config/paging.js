"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paging = void 0;
class Paging {
    constructor(pageIndex, pageSize) {
        this.count = 0;
        this.setPageIndex = (pageIndex) => {
            this.pageIndex = pageIndex;
        };
        this.setPageSize = (pageSize) => {
            this.pageSize = pageSize;
        };
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
    }
    getPiPS() {
        const pageIndex = this.pageIndex;
        const pageSize = this.pageSize;
        return {
            pageIndex,
            pageSize,
        };
    }
    getTakeSkip() {
        const take = this.pageSize && typeof this.pageSize === 'string'
            ? parseInt(this.pageSize)
            : 0;
        const skip = this.pageIndex && typeof this.pageIndex === 'string'
            ? parseInt(this.pageIndex) * take
            : 0;
        const pi = this.pageIndex && typeof this.pageIndex === 'string'
            ? parseInt(this.pageIndex)
            : 0;
        const ps = this.pageIndex && typeof this.pageIndex === 'string'
            ? parseInt(this.pageIndex)
            : 0;
        const count = this.count;
        return {
            skip,
            take,
            pi,
            ps,
            count,
        };
    }
    getPageIndex() {
        return this.pageIndex;
    }
    getPageSize() {
        return this.pageSize;
    }
}
exports.Paging = Paging;
